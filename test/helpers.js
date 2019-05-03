import chai from "chai";
import app from "../server";
import supertest from "supertest";

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
