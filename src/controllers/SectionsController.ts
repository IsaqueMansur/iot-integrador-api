import { PrismaClient } from "@prisma/client";
import { Get, JsonController } from "routing-controllers";
import ErrorRequest from "./private/PErrorController";
import createRandomToken from "../utils/createRandomToken";

@JsonController("/sections")
export class SectionsController {
  private PrismaInstance = new PrismaClient();
  @Get("/new")
  async createNewSection() {
    try {
      const newSection = await this.PrismaInstance.sections.create({
        data: {
          question_number: 1,
          last_response: "",
          key: createRandomToken(),
        },
      });
      return newSection;
    } catch (Error: any) {
      throw new ErrorRequest(
        Error.httpCode ? Error.httpCode : 500,
        Error.message ? Error.message : "Falha interna no servidor"
      );
    }
  }
}
