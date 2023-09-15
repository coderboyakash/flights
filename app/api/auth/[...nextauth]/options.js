
import axios from "axios";
import cryptoJs from 'crypto-js'
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                try {
                    const body = {
                        email: credentials.email,
                        password: credentials.password
                    }
                    const bodyString = JSON.stringify(body)
                    const payload = { request_data: cryptoJs.AES.encrypt(bodyString, 'aLtAeNCrypT').toString() };
                    const apiResponse = await axios({
                        method: 'POST',
                        url: `https://devadmin.altabooking.com/api/v2/auth/login`,
                        data: payload,
                        headers: {
                            apikey: "indusAltaR2PSM",
                            currency: "U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCALQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBsbLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvLCmpe0RATiqDh7g=="
                        }
                    });
                    if(apiResponse?.data?.main_data.res_code !== 200){
                        return null;
                    }else{
                        return apiResponse?.data?.main_data
                    }
                } catch (error) {
                    console.log("error: ", error);
                }
            },
        }),
    ],
};
