import { put, call } from 'redux-saga/effects'
import { post, get } from '../../common/api/index'

import * as actionKind from '../../action/names/ActionKind'
import { ADD_SP_SKILLS, LOAD_SP_SKILLS } from '../../action/names/UserActionNames'
import { LOAD_SKILLS } from '../../action/names/ContentSearchNames'

export function* loadSPSkillsSaga() {
  try {
    const { data } = yield call(get, 'provider/getSkills/', false)
    yield put({ type: actionKind.success(LOAD_SP_SKILLS), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SP_SKILLS) })
  }
}

export function* addSkillsSaga({ list }) {
  try {
    const skillsIds = []
    list.map(item => skillsIds.push(item.id))
    yield call(post, 'provider/addSkills', {
      skillsIds,
    })
    yield put({ type: actionKind.success(ADD_SP_SKILLS) })
  } catch (error) {
    yield put({ type: actionKind.error(ADD_SP_SKILLS) })
  }
}

export function* loadSkillsSaga() {
  try {
    const { data } = yield call(get, 'dictionaries/skills', false)
    yield put({ type: actionKind.success(LOAD_SKILLS), data })
  } catch (error) {
    yield put({ type: actionKind.error(LOAD_SKILLS) })
  }
}
