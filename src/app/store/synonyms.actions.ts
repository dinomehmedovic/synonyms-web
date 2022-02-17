export class GetSynonyms {
  static readonly type = "[Synonyms] GetSynonyms";
  constructor(public synonym: string) {}
}

export class AddSynonyms {
  static readonly type = "[Synonyms] AddSynonyms";
  constructor(public newSynonym: string) {}
}

export class DeleteSynonym {
  static readonly type = "[Synonyms] DeleteSynonym";
  constructor(public synonym: string) {}
}

export class UpdateSynonym {
  static readonly type = "[Synonyms] UpdateSynonym";
  constructor(public synonym: string, public updatedSynonym: string) {}
}
