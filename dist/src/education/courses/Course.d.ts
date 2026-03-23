export declare class Course {
    id: number;
    code: string;
    name: string;
    description: string | null;
    price: string | null;
    currency: string;
    isActive: boolean;
    moodleCourseId: number | null;
    createdAt: Date;
    updatedAt: Date;
}
