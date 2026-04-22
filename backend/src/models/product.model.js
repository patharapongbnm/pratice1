export class ProductModel {
  constructor(data) {
    this.code     = data.code;
    this.name     = data.name;
    this.category = data.category;
    this.price    = data.price;
    this.stock    = data.stock;
  }

  toObject() {
    return {
      code:     this.code,
      name:     this.name,
      category: this.category,
      price:    this.price,
      stock:    this.stock,
    };
  }
}