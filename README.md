# Panocea

Panocea is a website to help you achieve your every-day tasks such as note taking, to-do lists and more. To make these kind of CRUD operations I used Prisma and since I wanted to keep the design really clean and 'cold', chose to use an UI library called ShadCN. I also chose to use Zod for server side form validation. To take notes, I used a WYSIWYG editor called Tiptap.dev, which then outputs the text as a JSON, and it gets saved in the database, with a reference to the user, who logged with NextAuth trough one of the providers
