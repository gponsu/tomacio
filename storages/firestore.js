import firestore from "../utils/firestore";

export default {
  getItem: async (key, user) => {
    let items = [];

    if (!user) return items;

    const snapshot = await firestore
      .collection('users')
      .doc(user.uid)
      .collection(key)
      .get();

    snapshot.forEach((doc) => items.push(doc.data()));

    return items;
  },
  setItem: (key, value, user) => {
    if (!user) return;

    value.forEach(item => (
      firestore.collection('users')
               .doc(user.uid)
               .collection(key)
               .doc(item.uuid)
               .set(item)
    ));
  }
}
