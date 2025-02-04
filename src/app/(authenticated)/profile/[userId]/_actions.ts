"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
