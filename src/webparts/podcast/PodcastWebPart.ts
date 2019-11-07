import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "PodcastWebPartStrings";
import Podcast from "./components/Podcast";
import { IPodcastProps } from "./components/IPodcastProps";
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
  ISemanticColors
} from "@microsoft/sp-component-base";

export default class PodcastWebPart extends BaseClientSideWebPart<
  IPodcastProps
> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    return super.onInit();
  }
  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  public render(): void {
    const element: React.ReactElement<IPodcastProps> = React.createElement(
      Podcast,
      {
        themeVariant: this._themeVariant,
        title: this.properties.title,
        description: this.properties.description,
        rssUrl: this.properties.rssUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: "Title",
              groupFields: [
                PropertyPaneTextField("description", {
                  label: "Title."
                })
              ]
            },
            {
              groupName: strings.RssFeed,
              groupFields: [
                PropertyPaneTextField("rssUrl", {
                  label: "Url"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
