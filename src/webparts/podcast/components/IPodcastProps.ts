import { IReadonlyTheme } from "@microsoft/sp-component-base";
export interface IPodcastProps {
  themeVariant: IReadonlyTheme | undefined;
  title: string;
  description: string;
  rssUrl: string;
}
