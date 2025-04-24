import { apiInternalError } from '@/lib/constants';
import prisma from '@/lib/prisma';
import type { ApiResponse } from '@/types/api';
import type { Publication } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(_req: NextRequest, { params }: Params): Promise<NextResponse<ApiResponse<Publication[]>>> {
  try {
    const { id: idOrPseudo } = params;

    const author = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrPseudo,
          },
          {
            pseudo: idOrPseudo,
          },
        ],
      },
    });

    if (!author) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Author not found',
        },
        { status: 404 },
      );
    }

    const publications = await prisma.publication.findMany({
      where: {
        authorId: author.id,
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
  }
}
