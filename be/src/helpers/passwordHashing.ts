import bcrypt from "bcryptjs"; 

export const passwordHashing = async (password : string): Promise<string> => {
    const saltRounds: number = 10;
    return await bcrypt.hash(password, saltRounds);
}

export const passwordCompare = async (dbUserPassword: string, hashedPassword : string) : Promise<boolean> => {
    return await bcrypt.compare(dbUserPassword, hashedPassword);
}