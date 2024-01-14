import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Config/firebase";

const shopsCollectionRef = collection(db, "shops");

export async function getShopList() {
    try {
        const data = await getDocs(shopsCollectionRef);
        const filterData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filterData;
    } catch (error) {
        console.log("error", error);
    }
}
export async function getShop(id) {
    console.log(id)
    try {
        const docRef = doc(db, "shops", id);
        const ShopDoc = await getDoc(docRef);
        return ShopDoc.data();
    } catch (error) {
        console.log("error", error);
    }
}
export async function submitShop(shopObj) {

    try {

        await addDoc(shopsCollectionRef, shopObj);
        return getShopList();
    } catch (error) {
        console.log("error", error);
    }
}
export async function deleteShop(id) {
    try {
        console.log("delete shopp")
        const ShopDoc = doc(db, "shops", id);
        await deleteDoc(ShopDoc);
        return getShopList();
    } catch (error) {
        console.log("error", error);
    }
}
export async function updateShop(id,updateShopObj) {
   
    try {
        const ShopDoc = doc(db, "shops", id);
        await updateDoc(ShopDoc, updateShopObj);
        return getShopList();
    } catch (error) {
        console.log("error", error);
    }
}