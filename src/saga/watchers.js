import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import { request, success, make } from '../action/names/ActionKind'

import { localeSaga } from './locale/localeSaga'

import { loadDefaultContentSaga } from './search/loadDefaultContentSaga'
import { loadVisaTypesSaga } from './search/loadVisaTypesSaga'
import { loadSearchProvires } from './search/loadSearchProviresSaga'
import { loadProviderSaga } from './search/loadProviderSaga'
import { contactProviderSaga } from './search/loadProviderSaga'

import { loadPopularServicesSaga } from './search/loadPopularServicesSaga'

import { loginSaga, getTokenSaga, loginSNSaga } from './auth/loginSaga'
import { logoutSaga } from './auth/logoutSaga'
import { resendSaga } from './auth/resendSaga'
import { joinSaga, joinSPSaga } from './auth/joinSaga'
import { forgotSaga } from './auth/forgotSaga'
import { refreshSaga } from './auth/refreshSaga'

import { updateUserSaga } from './user/updateUserSaga'
import { updateSPSaga } from './user/updateSPSaga'
import { contactUsSaga } from './user/contactUsSaga'

import { loadSkillsSaga, loadSPSkillsSaga, addSkillsSaga } from './user/skillsSaga'
import { addCountriesSaga, loadSPCountriesSaga, loadCountriesSaga } from './user/countriesSaga'
import { loadSPLanguagesSaga, addLanguagesSaga, loadLanguagesSaga } from './user/languagesSaga'
import { addSPEducationSaga, loadSPEducationSaga, removeSPEducationSaga } from './user/educationSaga'
import { addSPLicenseSaga, loadSPLicenseSaga, removeSPLicenseSaga } from './user/licenseSaga'
import { addAwardsSaga, loadAwardsSaga, removeSPAwardsSaga } from './user/awardsSaga'
import { addMediaSaga, loadMediaSaga, removeMediaSaga } from './user/mediaSaga'

import { loadSPInfoSaga } from './user/loadSPInfoSaga'

import { loadChatsListSaga } from './chat/loadChatsListSaga'
import { loadChatHistorySaga } from './chat/loadChatHistorySaga'
import { sendMessageSaga } from './chat/sendMessageSaga'
import { loadUserDetailsSaga } from './chat/loadUserDetailsSaga'
import { getUnreadChatsSaga } from './chat/getUnreadChatsSaga'
import { sendReadChatsSaga } from './chat/sendReadChatsSaga'
import { getNotificationIdSaga } from './chat/getNotificationIdSaga'
import { notificationSaga } from './chat/notificationSaga'
import { getUnreadMessagesCountSaga } from './chat/getUnreadMessagesCountSaga'
import { CHANGE_LOCALE } from '../action/names/LocaleNames'

import {
  LOAD_DEFAULT_CONTENT_LIST,
  LOAD_VISA_TYPE_LIST,
  LOAD_SEARCH_PROVIDERS_LIST,
  LOAD_PROVIDER,
  CONTACT_PROVIDER,
  LOAD_POPULAR_SERVICES,
  LOAD_DATA_REGISTRATION,
} from '../action/names/ContentSearchNames'
import {
  REGISTER_NEW_USER,
  REGISTER_NEW_SP,
  LOGIN,
  LOGIN_SN,
  RESEND_EMAIL,
  LOGOUT,
  FORGOT_PASSWORD,
  RESEND_FORGOT_PASSWORD,
  REFRESH_TOKEN,
} from '../action/names/AuthActionNames'

import {
  UPDATE_USER,
  UPDATE_SP,
  CONTACT_US,
  ADD_SP_EDUCATION,
  ADD_SP_MEDIA,
  DELETE_SP_EDUCATION,
  ADD_SP_LANGUAGES,
  ADD_SP_COUNTRIES,
  ADD_SP_SKILLS,
  ADD_SP_AWARDS,
  ADD_SP_LICENSE,
  DELETE_SP_LICENSE,
  DELETE_SP_AWARDS,
  DELETE_SP_MEDIA,
} from '../action/names/UserActionNames'

import {
  LOAD_USER_CHATS,
  LOAD_CHAT_HISTORY,
  SEND_MESSAGE,
  LOAD_USER_DETAILS,
  LOAD_NOTIFICATION_ID,
  SEND_READ_CHATS,
} from '../action/names/ChatActionNames'

export default function* watchAll() {
  yield all([
    takeEvery(make(CHANGE_LOCALE), localeSaga),

    takeEvery(request(LOAD_DEFAULT_CONTENT_LIST), loadDefaultContentSaga),
    takeEvery(request(LOAD_POPULAR_SERVICES), loadPopularServicesSaga),
    takeEvery(request(LOAD_VISA_TYPE_LIST), loadVisaTypesSaga),
    takeEvery(request(LOAD_SEARCH_PROVIDERS_LIST), loadSearchProvires),
    takeEvery(request(LOAD_PROVIDER), loadProviderSaga),
    takeEvery(make(CONTACT_PROVIDER), contactProviderSaga),

    takeEvery(request(REGISTER_NEW_USER), joinSaga),
    takeEvery(request(REGISTER_NEW_SP), joinSPSaga),
    takeEvery(request(LOGIN), loginSaga),
    takeEvery(success(LOGIN), getTokenSaga),
    takeEvery(request(LOGIN_SN), loginSNSaga),
    takeEvery(success(LOGIN_SN), getTokenSaga),
    takeEvery(request(RESEND_EMAIL), resendSaga),
    takeEvery(make(LOGOUT), logoutSaga),
    takeEvery(request(FORGOT_PASSWORD), forgotSaga),
    takeEvery(request(RESEND_FORGOT_PASSWORD), forgotSaga),

    takeEvery(request(UPDATE_USER), updateUserSaga),
    takeEvery(success(UPDATE_USER), getTokenSaga),

    takeEvery(request(CONTACT_US), contactUsSaga),

    //Registration Form for SP
    takeEvery(request(UPDATE_SP), updateSPSaga),
    takeEvery(success(UPDATE_SP), getTokenSaga),

    //pre-load data for Registration Form
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPInfoSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPEducationSaga),

    takeEvery(make(LOAD_DATA_REGISTRATION), loadLanguagesSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPLanguagesSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadCountriesSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPCountriesSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadAwardsSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSkillsSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPSkillsSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPSkillsSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadSPLicenseSaga),
    takeEvery(make(LOAD_DATA_REGISTRATION), loadMediaSaga),

    takeEvery(request(ADD_SP_LANGUAGES), addLanguagesSaga),
    takeEvery(success(ADD_SP_LANGUAGES), loadSPLanguagesSaga),
    takeEvery(request(ADD_SP_COUNTRIES), addCountriesSaga),
    takeEvery(success(ADD_SP_COUNTRIES), loadSPCountriesSaga),
    takeEvery(request(ADD_SP_SKILLS), addSkillsSaga),
    takeEvery(success(ADD_SP_SKILLS), loadSkillsSaga),

    takeEvery(request(ADD_SP_AWARDS), addAwardsSaga),
    takeEvery(success(ADD_SP_AWARDS), loadAwardsSaga),
    takeEvery(request(DELETE_SP_AWARDS), removeSPAwardsSaga),
    takeEvery(success(DELETE_SP_AWARDS), loadAwardsSaga),

    takeEvery(request(ADD_SP_MEDIA), addMediaSaga),
    takeEvery(success(ADD_SP_MEDIA), loadMediaSaga),
    takeEvery(request(DELETE_SP_MEDIA), removeMediaSaga),
    takeEvery(success(DELETE_SP_MEDIA), loadMediaSaga),

    takeEvery(request(ADD_SP_EDUCATION), addSPEducationSaga),
    takeEvery(success(ADD_SP_EDUCATION), loadSPEducationSaga),
    takeEvery(request(DELETE_SP_EDUCATION), removeSPEducationSaga),
    takeEvery(success(DELETE_SP_EDUCATION), loadSPEducationSaga),

    takeEvery(request(ADD_SP_LICENSE), addSPLicenseSaga),
    takeEvery(success(ADD_SP_LICENSE), loadSPLicenseSaga),

    takeEvery(request(DELETE_SP_LICENSE), removeSPLicenseSaga),
    takeEvery(success(DELETE_SP_LICENSE), loadSPLicenseSaga),

    //Chats sagas
    takeEvery(request(LOAD_USER_CHATS), loadChatsListSaga),
    takeEvery(success(LOAD_USER_CHATS), getUnreadChatsSaga),

    takeEvery(request(LOAD_NOTIFICATION_ID), getNotificationIdSaga),
    takeEvery(success(LOAD_NOTIFICATION_ID), notificationSaga),
    takeEvery(success(LOAD_NOTIFICATION_ID), getUnreadMessagesCountSaga),

    takeLatest(request(LOAD_CHAT_HISTORY), loadChatHistorySaga),
    takeEvery(success(LOAD_CHAT_HISTORY), sendReadChatsSaga),
    takeEvery(success(LOAD_CHAT_HISTORY), getUnreadMessagesCountSaga),

    takeEvery(request(SEND_MESSAGE), sendMessageSaga),

    takeEvery(request(SEND_READ_CHATS), sendReadChatsSaga),

    takeEvery(request(LOAD_USER_DETAILS), loadUserDetailsSaga),

    takeEvery(request(REFRESH_TOKEN), refreshSaga),
  ])
}
