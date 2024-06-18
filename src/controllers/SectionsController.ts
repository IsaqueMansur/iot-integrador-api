import { PrismaClient } from "@prisma/client";
import { Body, Get, Post, JsonController, Param } from "routing-controllers";
import ErrorRequest from "./private/PErrorController";
import createRandomToken from "../utils/createRandomToken";
import {
  ISectionResponseProtocol,
  ISectionValidateResponseProtocol,
} from "../interfaces/ISection";

@JsonController("/sections")
export class SectionsController {
  private PrismaInstance = new PrismaClient();

  //from f.e.
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

  @Get("/infos/:key")
  async getSectionInfos(@Param("key") key: string) {
    try {
      const section = await this.PrismaInstance.sections.findUnique({
        where: { key },
      });
      if (!section) throw new ErrorRequest(404, "Sessão não encontrada");
      return section;
    } catch (Error: any) {
      throw new ErrorRequest(
        Error.httpCode ? Error.httpCode : 500,
        Error.message ? Error.message : "Falha interna no servidor"
      );
    }
  }

  @Post("/nextQuestion")
  async nextSectionQuestion(@Body() body: ISectionValidateResponseProtocol) {
    try {
      const { key, next_question_number } = body;
      const section = await this.PrismaInstance.sections.findUnique({
        where: { key },
      });
      if (!section) throw new ErrorRequest(404, "Sessão não encontrada");
      await this.PrismaInstance.sections.update({
        where: { id: section.id },
        data: {
          question_number: Number(next_question_number),
          last_response: "",
        },
      });
      return { message: "Success" };
    } catch (Error: any) {
      throw new ErrorRequest(
        Error.httpCode ? Error.httpCode : 500,
        Error.message ? Error.message : "Falha interna no servidor"
      );
    }
  }

  //from mic.
  @Post("/response")
  async storeResponse(@Body() body: ISectionResponseProtocol) {
    try {
      const { key, response } = body;
      const section = await this.PrismaInstance.sections.findUnique({
        where: { key },
      });
      if (!section) throw new ErrorRequest(404, "Sessão não encontrada");
      await this.PrismaInstance.sections.update({
        where: { id: section.id },
        data: {
          last_response: response,
        },
      });
      return { message: "Success" };
    } catch (Error: any) {
      throw new ErrorRequest(
        Error.httpCode ? Error.httpCode : 500,
        Error.message ? Error.message : "Falha interna no servidor"
      );
    }
  }

  @Get("/validateConnection/:key")
  async validateMicrocontrollerConnection(@Param("key") key: string) {
    try {
      const section = await this.PrismaInstance.sections.findUnique({
        where: { key },
      });
      if (!section) throw new ErrorRequest(404, "Sessão não encontrada");
      await this.PrismaInstance.sections.update({
        where: { id: section.id },
        data: {
          activated: true,
        },
      });
      return true;
    } catch (Error: any) {
      throw new ErrorRequest(
        Error.httpCode ? Error.httpCode : 500,
        Error.message ? Error.message : "Falha interna no servidor"
      );
    }
  }
}
