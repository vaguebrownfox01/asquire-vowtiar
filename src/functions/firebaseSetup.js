// Firebase
exports.PROJECT_ID = "asquire-mox";

// Version code
exports.VERSION = "yin";
exports.WEEK = 1;

// Firestore
exports.DATABASE_URL = "https://asquire-mox.firebaseio.com";
exports.ACTIVE_DOCS = `active_${this.VERSION}`;
exports.USERS_COLLECTION = `users_remun_${this.VERSION}`;
exports.CONTENT_COLLECTION = "content";
exports.STIM_DOC = "stimulus";
exports.SURVEY_DOC = "survey";

// Storage
exports.STORAGE_BUCKET = "asquire-mox.appspot.com";

//  folder path
exports.INSTRUCTION_AUDIO_FOLDER = "instructions_audio/";
exports.AUDIO_DATA_FOLDER = `${this.VERSION}_weekly_data_${this.WEEK}`;
