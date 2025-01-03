"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const prisma_1 = require("../../db/prisma");
const registerUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield prisma_1.prisma.user.findFirst({
            where: {
                email: newUser.email,
            },
        });
        if (user)
            throw new Error("usuario ya existe");
        const { ownerOf } = newUser, rest = __rest(newUser, ["ownerOf"]);
        const query = Object.assign({}, rest);
        if (ownerOf) {
            query.Residence = {
                connect: {
                    id: ownerOf
                }
            };
        }
        const _a = yield prisma_1.prisma.user.create({
            data: query
        }), { password } = _a, restUser = __rest(_a, ["password"]);
        return Object.assign({}, restUser);
    }
    catch (error) {
        throw error;
    }
});
exports.registerUser = registerUser;
