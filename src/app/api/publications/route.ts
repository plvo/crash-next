import { apiInternalError } from '@/lib/constants';
import prisma from '@/lib/prisma';
import type { ApiResponse } from '@/types/api';
import type { PublicationWithAuthor } from '@/types/prisma';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest): Promise<NextResponse<ApiResponse<PublicationWithAuthor[]>>> {
  try {
    const publications = await prisma.publication.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            pseudo: true,
            email: true,
            phone: true,
            role: true,
            profileImg: true,
          },
        },
      },
    });

    if (!publications) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Publications not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, data: publications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(apiInternalError, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
