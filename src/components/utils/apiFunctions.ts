import {
  Data,
  CrudArguments,
  Route,
  Todo,
  RssFeed,
  FinanceItem,
} from "@/types";

export async function Crud<T extends keyof Data>(props: CrudArguments<T>) {
  const writable = await props.fileData.fileHandle.createWritable();
  const data: Data = JSON.parse(props.fileData.contents);

  switch (props.method) {
    case "create":
      const dataArray: (Route | Todo | RssFeed | FinanceItem)[] =
        data[props.where];
      dataArray.push(props.what);
      break;

    case "delete":
      data[props.where] = (data[props.where] as []).filter(
        (element) => element[props.fieldName] !== props.id
      );
      break;

    default:
      console.log(
        "Did you forgot to add the 'method' inside the Crud function? Because in the apiFunctions.ts file the default statement ran"
      );
  }

  await writable.write(JSON.stringify(data, null, 2));
  await writable.close();
  return { contents: JSON.stringify(data, null, 2) };
}
