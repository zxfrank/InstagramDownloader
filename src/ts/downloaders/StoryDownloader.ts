/****************************************************************************************
 * Copyright (c) 2020. HuiiBuh                                                          *
 * This file (StoryDownloader.ts) is part of InstagramDownloader which is released under*
 * GNU LESSER GENERAL PUBLIC LICENSE.                                                   *
 * You are not allowed to use this code or this file for another project without        *
 * linking to the original source AND open sourcing your code.                          *
 ****************************************************************************************/

/**
 * Download class which can be used to download stories
 */
class StoryDownloader extends Downloader {

    /**
     * Create a new download button
     */
    createDownloadButton(): void {

        const settingsButton: HTMLElement = document.getElementsByClassName('dCJp8 afkep')[0] as HTMLElement;

        // Check if the story has already loaded
        if (typeof settingsButton === 'undefined') {
            return;
        }

        const downloadButton: HTMLElement = document.createElement('span');
        downloadButton.setAttribute('class', 'story-download-button');
        settingsButton.insertBefore(downloadButton, settingsButton.childNodes[0]);

        const accountName: string = this.getAccountName(document.body, Variables.storyAccountName);
        downloadButton.onclick = this.downloadContent(accountName);
    }


    /**
     * Download the correct content
     * @param accountName The name of the account
     */
    private downloadContent(accountName: string): (event: MouseEvent) => void {
        return (event: MouseEvent): void => {
            event.stopPropagation();
            event.preventDefault();
            const video = document.getElementsByTagName('source')[0];
            const img = document.getElementsByClassName(Variables.storyImageClass)[0] as HTMLImageElement;

            let url: string;
            if (typeof video !== 'undefined') {
                url = video.src;
            } else if (typeof img !== 'undefined') {
                url = img.src;
            }

            const downloadMessage: DownloadMessage = {
                imageURL: [url],
                accountName,
                type: ContentType.single,
            };
            // @ts-ignore
            browser.runtime.sendMessage(downloadMessage);

        };
    }

    /**
     * Reinitialize the downloader
     */
    reinitialize(): void {
        this.remove();
        this.init();
    }

    /**
     * Remove the downloader
     */
    remove(): void {
        super.remove('story-download-button');
    }
}
