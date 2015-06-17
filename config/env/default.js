'use strict';

module.exports = {
	app: {
		title: 'HumanTranslated',
		description: 'Japanese Content and Language Integrated Learning (CLIL) system.',
		keywords: 'japanese, clic, japanese study, kanji, hiragana, katakana',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'Aekai5vi|uCa(quoow9yia7eiphuphoo9ahnaeth',
	sessionCollection: 'sessions'
};
