Imagine you have a simple to-do list application in React using Prisma for database interactions. Tasks can be created and deleted. It takes 10 seconds for a task to be created or deleted to the database (10s is just a made up number). To improve the user experience, you initially add newly created tasks to a local state. Once the POST request to the database succeeds, you replace the temporary item (with a temporary id) in the state with the actual item (and actual id) created in the database. For example, you start with
Basically:

    const localState = [{ id: 1, text: "first" }, { id: 2, text: "second" }];
    // When the user clicks the 'create button':
    const localState = [{ id: 1, text: "first" }, { id: 2, text: "second" }, { id: "temporary-3-id", text: "third" }];
    // Then, when the database creates the element, it swaps it:
    const localState = [{ id: 1, text: "first" }, { id: 2, text: "second" }, { id: 3, text: "third" }];

Now, consider a scenario where the user clicks the 'create button' to add a task but decides to delete it before it gets created in the database. How can you tell the database to delete this task, taking into account that the database returns the object when it's been deleted or created?

```ts
async function Crud<T extends PrismaCleared>(props: PrismaBody<T>) {
  const temporaryId = `temporary-${v4()}`;
  const localWhere = (props.where + "s") as Pluralize<PrismaCleared>;

  switch (props.method) {
    case "update":
      setUserData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [localWhere]: [
            ...prev.user[localWhere].map((el) =>
              el.id === props.what.id ? props.what : el
            ),
          ],
        },
      }));
      break;
    case "create":
      setUserData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [localWhere]: [
            ...prev.user[localWhere],
            { ...props.what, id: temporaryId },
          ],
        },
      }));
      break;
    case "deleteMany":
      if (props.what.find((id) => id.startsWith("temporary"))) {
        console.log(
          `An error occured because you tried to delete an element that you just created before it got created in the database. Wait and try again`
        );
      }
      setUserData((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          [localWhere]: [
            ...prev.user[localWhere].filter(
              (el) => !props.what.includes(el.id!)
            ),
          ],
        },
      }));
      break;
  }

  const res = await fetch("/api/crud", {
    method: "POST",
    body: JSON.stringify(props),
  });
  const data = await res.json();
  console.log("ELEMENT CREATED TO DB", userData.user.todos);
  // This swaps the new created element with the actual element created to the DB
  setUserData((prev) => ({
    ...prev,
    user: {
      ...prev.user,
      [localWhere]: [
        ...prev.user[localWhere].map((el) =>
          el.id === temporaryId ? data : el
        ),
      ].reverse(),
    },
  }));

  return data;
}
```
