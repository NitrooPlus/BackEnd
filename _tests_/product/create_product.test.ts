import db from "../../DB/db";
import create_product from "../../services/product/controller/create_product";

describe("/create_product", () => {
  it("unAuthorized request", async () => {
    let response = await create_product({}, {});
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Bad request", async () => {
    let response = await create_product({}, { id: 1 });
    expect(response.status).toBe(400);
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([[{ id: 1 }]]);
    let response = await create_product(
      { url: "1", title: "1", price: 1, company_url: "1" },
      { id: 1 }
    );
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await create_product(
      { url: "1", title: "1", price: 1, company_url: "1" },
      { id: 1 }
    );
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });

  it("duplicate error", async () => {
    db.execute = jest
      .fn()
      .mockRejectedValue(new Error("fk_company_product_unique"));
    let response = await create_product(
      { url: "1", title: "1", price: 1, company_url: "1" },
      { id: 1 }
    );
    expect(response).toEqual({
      status: 400,
      content: { url: "عنوان تکراری است" },
    });
  });
});
