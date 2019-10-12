declare interface IPodcastWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  Title: string,
  DescriptionFieldLabel: string;
  RssFeed: string;
}

declare module 'PodcastWebPartStrings' {
  const strings: IPodcastWebPartStrings;
  export = strings;
}
