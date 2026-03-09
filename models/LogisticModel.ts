// To parse this data:
//
//   import { Convert } from "./file";
//
//   const logisticModel = Convert.toLogisticModel(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface LogisticModel {
    ID:                        number;
    CreatedAt:                 Date;
    UpdatedAt:                 Date;
    DeletedAt:                 Date | null;
    logistic_id:               string;
    logistic_name:             string;
    panjang_cm:                number;
    lebar_cm:                  number;
    tinggi_cm:                 number;
    volume_cm3:                number;
    berat_kg:                  number;
    density_kg_per_cm3:        number;
    fragility_0_1:             number;
    stackability_0_1:          number;
    orientation_flexibility:   string;
    kategori:                  string;
    tanggal_produksi:          string;         
    tanggal_kadaluarsa:        string;          
    days_to_expiry:            number;
    shelf_life_days:           number;
    durability:                string;
    urgensi_pengiriman_1_5:    number;
    lokasi_asal:               string | null;   
    lokasi_tujuan:             string | null;   
    jarak_km:                  number | null;   
    mode_transport:            string | null;   
    eta_hari:                  number;
    nilai_barang_idr:          number;
    prioritas_pelanggan:       string;
    asuransi:                  boolean;
    biaya_simpan_per_hari_idr: number | null;   
    biaya_transport_idr:       number | null;   
    temperatur_c:              number;
    kelembaban_ideal_pct:      number;
    jenis_packaging:           string | null;   
    barcode:                   string;
    batch_number:              string | null;   
    mode_darat:                boolean;
    mode_laut:                 boolean;
    mode_udara:                boolean;
}


// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toLogisticModel(json: string): LogisticModel[] {
        return cast(JSON.parse(json), a(r("LogisticModel")));
    }

    public static logisticModelToJson(value: LogisticModel[]): string {
        return JSON.stringify(uncast(value, a(r("LogisticModel"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "LogisticModel": o([
        { json: "ID", js: "ID", typ: 0 },
        { json: "CreatedAt", js: "CreatedAt", typ: Date },
        { json: "UpdatedAt", js: "UpdatedAt", typ: Date },
        { json: "DeletedAt", js: "DeletedAt", typ: u(Date,) },

        { json: "logistic_id", js: "logistic_id", typ: "" },
        { json: "logistic_name", js: "logistic_name", typ: "" },

        { json: "panjang_cm", js: "panjang_cm", typ: 3.14 },
        { json: "lebar_cm", js: "lebar_cm", typ: 3.14 },
        { json: "tinggi_cm", js: "tinggi_cm", typ: 3.14 },
        { json: "volume_cm3", js: "volume_cm3", typ: 3.14 },
        { json: "berat_kg", js: "berat_kg", typ: 3.14 },
        { json: "density_kg_per_cm3", js: "density_kg_per_cm3", typ: 3.14 },

        { json: "fragility_0_1", js: "fragility_0_1", typ: 3.14 },
        { json: "stackability_0_1", js: "stackability_0_1", typ: 3.14 },

        { json: "orientation_flexibility", js: "orientation_flexibility", typ: "" },
        { json: "kategori", js: "kategori", typ: "" },

        { json: "tanggal_produksi", js: "tanggal_produksi", typ: "" },
        { json: "tanggal_kadaluarsa", js: "tanggal_kadaluarsa", typ: "" },

        { json: "days_to_expiry", js: "days_to_expiry", typ: 0 },
        { json: "shelf_life_days", js: "shelf_life_days", typ: 0 },

        { json: "durability", js: "durability", typ: "" },
        { json: "urgensi_pengiriman_1_5", js: "urgensi_pengiriman_1_5", typ: 0 },

        { json: "lokasi_asal", js: "lokasi_asal", typ: u(null, "") },
        { json: "lokasi_tujuan", js: "lokasi_tujuan", typ: u(null, "") },

        { json: "jarak_km", js: "jarak_km", typ: u(3.14, null) },
        { json: "mode_transport", js: "mode_transport", typ: u("", null) },

        { json: "eta_hari", js: "eta_hari", typ: 0 },

        { json: "nilai_barang_idr", js: "nilai_barang_idr", typ: 3.14 },

        { json: "prioritas_pelanggan", js: "prioritas_pelanggan", typ: "" },

        { json: "asuransi", js: "asuransi", typ: true },

        { json: "biaya_simpan_per_hari_idr", js: "biaya_simpan_per_hari_idr", typ: u(3.14, null) },
        { json: "biaya_transport_idr", js: "biaya_transport_idr", typ: u(3.14, null) },

        { json: "temperatur_c", js: "temperatur_c", typ: 3.14 },
        { json: "kelembaban_ideal_pct", js: "kelembaban_ideal_pct", typ: 3.14 },

        { json: "jenis_packaging", js: "jenis_packaging", typ: u("", null) },

        { json: "barcode", js: "barcode", typ: "" },
        { json: "batch_number", js: "batch_number", typ: u("", null) },

        { json: "mode_darat", js: "mode_darat", typ: true },
        { json: "mode_laut", js: "mode_laut", typ: true },
        { json: "mode_udara", js: "mode_udara", typ: true },
    ], false),
};

