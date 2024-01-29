import db from "../../DB/db";
import create_company from "../../services/company/controller/create_company";

describe("/create_company", () => {
  it("unAuthorized request", async () => {
    let response = await create_company({}, {});
    expect(response).toEqual({
      status: 403,
      content: { message: "شما توانایی این کار را ندارید" },
    });
  });

  it("Bad request", async () => {
    let response = await create_company({}, { id: 1 });
    expect(response.status).toBe(400);
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    let response = await create_company(
      { location: "1", url: "1", title: "1" },
      { id: 1 }
    );
    expect(response).toEqual({
      status: 200,
      content: { message: "عملیات با موفقیت انجام شد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    let response = await create_company(
      { location: "1", url: "1", title: "1" },
      { id: 1 }
    );
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
