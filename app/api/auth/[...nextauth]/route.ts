import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authOptions } from "@/hooks/authOptions";
import prisma from "@/hooks/prismadb";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
