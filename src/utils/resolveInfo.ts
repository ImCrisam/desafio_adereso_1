import { fetchMap } from "../conexions/ApisExternal";



export async function resolveTaggedAndUntaggedEntities(
  entries: string[],
): Promise<Map<string, any>> {
  const resultMap = new Map<string, any>();
  const untagged: Array<{ key: string }> = [];

  const taggedPromises = entries.map(async (key)=>{
    const values =  key.replace("[", "").split("]")
    const type = values[0]??null
    const search = values[1]??null
    
    if (!search){
      untagged.push({key})
      resultMap.set(key, null)

    }

    if(type && search){
      const fetchFn = fetchMap.get(type);
      if (!fetchFn) throw new Error(`No existe función para la clave: ${key}`);
      try {
        const result = await fetchFn(search);
        resultMap.set(key, result)
      } catch (error) {
        console.log(error.code);
        
      }
    }
  })
  
  await Promise.all(taggedPromises)
  return resultMap;
}

export async function resolveEntitiesWithSaving(
  entries: string[],
  mapEntities: Map<string, any>,
  signal?: AbortSignal
){
  let countSavingUsed = 0
  const taggedPromises = entries.map(async (key)=>{

    if (mapEntities.has(key)){
      countSavingUsed++
      return;
    } 

    const values =  key.replace("[", "").split("]")
    const type = values[0]??null
    const search = values[1]??null
    
    if (!search){
      mapEntities.set(key, null)
      return
    }

    if(type && search){
      const fetchFn = fetchMap.get(type);
      if (!fetchFn) throw new Error(`No existe función para la clave: ${key}`);
      try {
        const result = await fetchFn(search, signal);
        mapEntities.set(key, result)
      } catch (error) {
        console.log(error.code);
        
      }
    }
  })
  
  await Promise.all(taggedPromises)
  return countSavingUsed
}
