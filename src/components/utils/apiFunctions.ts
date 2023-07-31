import { Data } from "@/types";

type Arguments<T extends keyof Data> = {
  where: T;
} & (
  | {
      method: "create";
      what: Data[keyof Data][0];
    }
  | { method: "delete"; id: string; fieldName: keyof Data[T][0] }
);

export async function Crud<T extends keyof Data>(props: Arguments<T>) {
  const body =
    props.method === "create"
      ? {
          what: props.what,
          where: props.where,
          method: props.method,
        }
      : {
          id: props.id,
          where: props.where,
          fieldName: props.fieldName,
          method: props.method,
        };

  const res = await fetch("api/crud", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}
