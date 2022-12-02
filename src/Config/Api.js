const SERVER = "http://192.168.0.15";
const PORT = "8080";
const API_BASE = "/workers/api/v1";

export const API = {
    auth: {
      signUp: SERVER + ":" + PORT + API_BASE + "/workers",
      signIn: SERVER + ":" + PORT + API_BASE + "/workers/authentication",
      findAllImages: SERVER + ":" + PORT + API_BASE + "/workers/",
      uploadImage: SERVER + ":" + PORT + API_BASE + "/workers/",
      changePassword: SERVER + ":" + PORT + API_BASE + "/user/changePassword",
      findByEmail: SERVER + ":" + PORT + API_BASE + "/authorizations/organizations/",
      byUserId: SERVER + ":" + PORT + API_BASE + "/authorizations/",
      findRolesByEmail: SERVER + ":" + PORT + API_BASE + "/authorizations/organizations/{email}/organizations/{organizationId}/roles",
      findAllRolesByUserId: SERVER + ":" + PORT + API_BASE + "/authorizations/",
      unassignRole: SERVER + ":" + PORT + API_BASE + "/authorizations/",
      assignRole: SERVER + ":" + PORT + API_BASE + "/authorizations",
    },
}  