'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
   	Schema = mongoose.Schema,
    _ = require('lodash'),
    mecab = require('mecab-ffi');

// Exclude these characters from being stored as words
var exclude_hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'ゐ', 'ゑ', 'を', 'ん', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ' ];
var exclude_katakana = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヰ', 'ヱ', 'ヲ', 'ン', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ'];
var exclude_punctuation = [ ' ', '＝', 'ー', '。', '、', '「', '」', '（', '）', '『', '』'];
var exclude_compound = ['する', 'ます', 'なく', 'なり','いる', 'なっ', 'まし', 'うえ', 'ない', 'おら' ];

var exclude = exclude_hiragana.concat(exclude_katakana).concat(exclude_punctuation).concat(exclude_compound);

/**
 * Words Schema
 */
var Words = new Schema({
  original: String,
  furigana: String
});

/**
 * Story Schema
 */
var StorySchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  wordcount: Number,
  words: [Words]
});

/**
 * Filter out excluded words
 */
var filterWord = function(word) {
    var original = word[0];
    var furigana = word[9];

    // Do not add single kana or punctuation marks.
    if (exclude.indexOf(original) === -1) {
      var word_json = {
        original: original,
        furigana: furigana
      };

    // return the new word
      return word_json;
    }
};

/**
 * Parse words
 */
var parseWords = function(words) {
  var words_obj = [];
  var parsed_words = 0;

	// Loop words to build out our words object
  _.each(words, function(word) {
    var word_json = filterWord(word);

    // Only add word once
    if (!_.findWhere(words_obj, word_json)) {
      words_obj.push(word_json);
    }
  });

  return words_obj;
};


/**
 * Parse all words and store them in story.words then save.
 */
StorySchema.pre('save', function(next) {
  var words = mecab.parseSync(this.content);
  this.words = parseWords(words);
  this.wordcount = this.words.length;
  return next();
});

mongoose.model('Story', StorySchema);
