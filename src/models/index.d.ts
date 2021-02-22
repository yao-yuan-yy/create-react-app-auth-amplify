import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class UntitledModel {
  readonly id: string;
  constructor(init: ModelInit<UntitledModel>);
  static copyOf(source: UntitledModel, mutator: (draft: MutableModel<UntitledModel>) => MutableModel<UntitledModel> | void): UntitledModel;
}