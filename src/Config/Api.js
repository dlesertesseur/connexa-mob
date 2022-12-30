//const SERVER = "http://192.168.0.15";
//const SERVER = "http://192.168.0.12"; //DEV
//const SERVER = "http://181.169.145.169"; //PROD
const SERVER = "http://192.168.0.18"; //LOCAL LINUX

const PORT = "8080";
const API_BASE = "/connexa/workers/api/v1"; //PROD
//const API_BASE = "/workers/api/v1"; //DEV


const LOCAL_SERVER = "http://192.168.0.11";
const LOCAL_API_BASE = "/admin/api/v1";


export const API = {
    auth: {
      signUp: SERVER + ":" + PORT + API_BASE + "/workers",
      signIn: SERVER + ":" + PORT + API_BASE + "/workers/authentication",
      findAllImages: SERVER + ":" + PORT + API_BASE + "/workers/",
      changePassword: SERVER + ":" + PORT + API_BASE + "/user/changePassword",
      findByEmail: SERVER + ":" + PORT + API_BASE + "/authorizations/organizations/",
      byUserId: SERVER + ":" + PORT + API_BASE + "/authorizations/",
      findRolesByEmail: SERVER + ":" + PORT + API_BASE + "/authorizations/organizations/{email}/organizations/{organizationId}/roles",
      findAllRolesByUserId: SERVER + ":" + PORT + API_BASE + "/authorizations/",
      unassignRole: SERVER + ":" + PORT + API_BASE + "/authorizations/",
      assignRole: SERVER + ":" + PORT + API_BASE + "/authorizations",
    },

    worker: {
      update: SERVER + ":" + PORT + API_BASE + "/workers/",
      updateStatus: SERVER + ":" + PORT + API_BASE + "/workers/",
      findImageByType: SERVER + ":" + PORT + API_BASE + "/workers/",
    },

    document:{
      uploadImage: SERVER + ":" + PORT + API_BASE + "/workers",
      imagefindTemplates: SERVER + ":" + PORT + API_BASE + "/ImageTemplates",
      findAllImagesByWorkerId: SERVER + ":" + PORT + API_BASE + "/workers",
      baseImageUrl: SERVER + ":" + PORT,
    },

    shift: {
      findAllByWorkerId: SERVER + ":" + PORT + API_BASE + "/workers/",
      findStartedShiftByWorkerId: SERVER + ":" + PORT + API_BASE + "/workers/",
      startWorkShiftById: SERVER + ":" + PORT + API_BASE + "/workers/",
      endWorkShiftById: SERVER + ":" + PORT + API_BASE + "/workers/",
      logActivity: SERVER + ":" + PORT + API_BASE + "/workers/",

    },
    product: {
      findByEan: LOCAL_SERVER + ":" + PORT + LOCAL_API_BASE + "/items/",
    },

    location: {
      register: SERVER + ":" + PORT + API_BASE + "/workers/",
    },

    parameter: {
      findById: SERVER + ":" + PORT + LOCAL_API_BASE + "/parameters/",
    },

    baseImageUrl: SERVER + ":" + PORT,
}  