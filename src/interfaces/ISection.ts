type TypesSectionsResponses = "left" | "right";
export interface ISectionResponseProtocol {
  key: string;
  response: TypesSectionsResponses;
}

export interface ISectionValidateResponseProtocol {
  key: string;
  next_question_number: number;
}
