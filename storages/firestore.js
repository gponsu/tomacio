import firestore from "../utils/firestore";

export default {
  getItem: async (key) => {
    let items = [];

    const snapshot = await firestore.collection(key).get();
    snapshot.forEach((doc) => items.push(doc.data()));

    return items;
  },
  setItem: (key, value) => {
    value.forEach(item => (
      firestore.collection(key)
               .doc(item.uuid)
               .set(item)
    ));
  }
}
