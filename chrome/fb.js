function nonpartisan_callback(keywords) {
    // newsfeed
    nonpartisan('#content','li.genericStreamStory',keywords);
    // newsticker
    nonpartisan('#content','div.fbFeedTickerStory',keywords);
    // timeline
    nonpartisan('#content','li.fbTimelineUnit',keywords);
}
