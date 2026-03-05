import { NextResponse } from 'next/server'
import { getActiveProducts } from '@/lib/local-data'

export async function GET() {
    try {
        const products = getActiveProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
