"use server";

import { apiInternalError } from "@/lib/constants";
import { ApiResponse } from "@/types/api";
import { PrismaClient, publications } from "@prisma/client";

const prisma = new PrismaClient();