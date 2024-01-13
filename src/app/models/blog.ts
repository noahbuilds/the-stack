export class Blog {
  text!: string;
  image!: string;
  likes!: number;
  tags!: Array<any>;
  owner!: string;
}

export class BlogPreview extends Blog {
  id!: string;

  publishDate!: string;
}
