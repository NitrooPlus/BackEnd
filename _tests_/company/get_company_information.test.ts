import db from "../../DB/db";
import get_company_information from "../../services/company/controller/get_company_information";

describe("/get_company_information", () => {
  it("Bad request", async () => {
    let response = await get_company_information("");
    expect(response).toEqual({
      status: 400,
      content: { message: "نام غرفه باید مشخص باشد" },
    });
  });

  it("Correct request", async () => {
    db.execute = jest.fn().mockResolvedValue([[1]]);
    const response = await get_company_information("correct value");
    expect(response).toEqual({ status: 200, content: 1 });
  });

  it("Not found", async () => {
    db.execute = jest.fn().mockResolvedValue([]);
    const response = await get_company_information("wrong value");
    expect(response).toEqual({
      status: 404,
      content: { message: "غرفه یافت نشد" },
    });
  });

  it("Internal error", async () => {
    db.execute = jest.fn().mockRejectedValue(new Error());
    const response = await get_company_information("wrong value");
    expect(response).toEqual({
      status: 500,
      content: { message: "مشکلی پیش آمده است" },
    });
  });
});
