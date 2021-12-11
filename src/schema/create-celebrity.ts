export const CreateCelebritySchema = {
  body: {
    type: "object",
    required: ["id", "name"],
    properties: {
      id: { type: "string", minLength: 36, maxLength: 36 },
      name: { type: "string", minLength: 1 },
    },
  },
};
