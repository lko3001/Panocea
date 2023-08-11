import { Data, CrudArguments } from "@/types";

export async function Crud<T extends keyof Data>(props: CrudArguments<T>) {
  const writable = await props.fileData.fileHandle.createWritable();
  if (props.where === "categories" && "fieldName" in props) {
    const data = props.fileData.contents;
    const categories = data.categories;
    const fieldName: keyof Data["categories"] =
      props.fieldName as keyof Data["categories"];

    switch (props.method) {
      case "create":
        categories[fieldName].push(props.what as string);
        break;
      case "delete":
        break;
      case "deleteMany":
        break;
    }
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
    return { contents: JSON.stringify(data, null, 2) };
  } else {
    const data: Exclude<Data, "categories"> = props.fileData.contents;
    const where = props.where as Exclude<keyof Data, "categories">;

    switch (props.method) {
      case "create":
        const dataArray = data[where];
        dataArray.push(props.what as any);
        break;

      case "delete":
        if ("fieldName" in props) {
          data[where] = (data[where] as []).filter(
            (element) => element[props.fieldName] !== props.fieldName
          );
        }
        break;

      case "deleteMany":
        if ("fieldName" in props) {
          data[where] = (data[where] as []).filter(
            (element) =>
              !(props.array as Data[Exclude<T, "categories">])
                .map((el: any) => el[props.fieldName])
                .includes(element[props.fieldName])
          );
        }
        break;

      default:
        console.log(
          "Did you forgot to add the 'method' inside the Crud function? Because in the apiFunctions.ts file the default statement ran"
        );
        break;
    }

    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
    return { contents: JSON.stringify(data, null, 2) };
  }
}
