import { getRealm } from "../../database/realm";
import uuid from "react-native-uuid"
import { extractSiteName } from "./WebScrapping";

export async function getProduct(id : string) {
    const realm = await getRealm()

    try {
        const product = realm.objectForPrimaryKey("Products", id);
        //@ts-ignore
        return product

    } catch (e) {
        console.log(e)
    } finally {
        realm.close
    }
}

export async function handleAddProduct(link : string) {
    const realm = await getRealm()
    var from = extractSiteName(link)
    var item = {
        _id: uuid.v4(),
        name: "produto",
        link: link,
        price: "",
        img: "",
        from: from,
        purchased: false,
        created_at: new Date().toISOString().slice(0, 10),
    }
    try {
        realm.write(() => {
            realm.create("Products", item)
        })

    } catch (e) {
        console.log(e)
    }
}

export async function updateProduct(id: string, newName: string, img: string, price: string) {
    const realm = await getRealm();

    try {
        realm.write(() => {
            const product = realm.objectForPrimaryKey("Products", id);
            product!.name = newName;
            product!.price = price;
            product!.img = img;
        });
    } catch (error) {
        console.log("Erro ao atualizar o título da tarefa:", error);
    } finally {
        realm.close
    }
}

export async function deleteProduct(id: string) {
    const realm = await getRealm()

    try {
        realm.write(() => {
            const objectToDelete = realm.objectForPrimaryKey("Products", id);
            realm.delete(objectToDelete);
        });
    } catch (e) {
        console.log(e)
    } finally {
        realm.close
    }
}