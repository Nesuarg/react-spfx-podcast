import * as React from 'react';
import styles from './Podcast.module.scss';
import { IPodcastProps } from './IPodcastProps';
import {Channel} from "../models/Channel";
import Item from "../models/Item";

import axios from "axios";

interface podcastState {
  podcast: Channel,
  activePodcast: Item
}

export default class Podcast extends React.Component<IPodcastProps, podcastState> {

  constructor(props) {
    super(props);

    this.state = {
      podcast: null, activePodcast: null};
  }

  public componentDidMount(): void {

    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subcription-Key': '426f0af6afd24b9688d14d529be91a1d'
    }

    // let apiUrl = 'https://podcast-spfx.azurewebsites.net/api/GetPodcastJson?code=tDf2aMJZemyqDPQIjqF12HeAEFv1CfqpWUnTaASmGHjtw4mC5dL6mA==';
    // axios.post(apiUrl, {'podUrl': this.props.rssUrl}).then(response => {
    //   let dataArr: any = response.data;
    //   if(dataArr.Status.toLowerCase() === "ok") {
    //     this.setState({ podcast: dataArr.Results.channel });
    //   }
    // });

    let apiUrl = 'https://podcast.azure-api.net/podcast-spfx3/GetPodcastJson';
    axios.post(apiUrl, { params: {'podUrl': this.props.rssUrl}, headers: headers}).then(response => {
      let dataArr: any = response.data;
      if(dataArr.Status.toLowerCase() === "ok") {
        this.setState({ podcast: dataArr.Results.channel });
      }
    });
  }
  public render(): React.ReactElement<IPodcastProps> {
    if (this.state.podcast === null) {
      //loading
      return (<div>loading</div>)
    } else {
      return (
        <div className={styles.podcast}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <img className={styles.image} src={this.state.podcast.image.url}/>
                <h1 className={styles.title}>{this.state.podcast.title}</h1>
                {/* <p>now playing: <strong>{this.state.activePodcast.title || ''}</strong></p>
                <audio controls>
                  <source src={this.state.activePodcast.enclusure['@url'] || ''}></source>
                </audio> */}
              </div>
              <div className={styles.column}>
                {
                  <ul className={styles.playlist}>
                    { 
                      Object(this.state.podcast.item).map((item, key) => {
                        return <li onClick={() => this.setState({activePodcast: item})} key={key}>
                          <p>{item.title}</p>
                        </li>
                      })
                    }
                  </ul>
                }
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
