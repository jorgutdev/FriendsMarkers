import * as firebase from 'firebase'

export default {
  // Functions return fixtures
  logout: () => {
      
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  }
}
