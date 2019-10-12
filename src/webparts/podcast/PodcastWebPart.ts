import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PodcastWebPartStrings';
import Podcast from './components/Podcast';
import { IPodcastProps } from './components/IPodcastProps';

export interface IPodcastWebPartProps {
  title: string,
  description: string;
  rssUrl: string;
}

export default class PodcastWebPart extends BaseClientSideWebPart<IPodcastWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPodcastProps > = React.createElement(
      Podcast,
      {
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
    return Version.parse('1.0');
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
              groupName: 'Title',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Title.'
                })
              ]
            },
            {
              groupName: strings.RssFeed,
              groupFields: [
              PropertyPaneTextField('rssUrl', {
                label: 'Url'
              })
            ]
            }
          ]
        }
      ]
    };
  }
}
