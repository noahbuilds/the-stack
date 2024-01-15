export class Blog {
  title!: string;
  body!: string;
  image!: string;
  // likes!: number;
  author!: {
    username: string;
    email: string;
    _id: string;
  };
}

export class BlogPreview extends Blog {
  _id!: string;

  createdAt!: string;
  updatedAt!: string;
}

export class BlogList {
  data!: BlogPreview[];
  total!: number;
  page!: number;
  limit!: number;
}

export class EditBlog {
  body!: string;
  image!: string;

  // tags!: Array<string>;
  title!: string;
}

export class NewBlog {
  body!: string;
  image!: string;
  // tags!: Array<string>;
  author!: string;
  title!: string;
}



export class Login {
  email!: string;
  password!: string;
}
