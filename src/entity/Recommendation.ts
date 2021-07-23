import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, Matches, IsInt } from "class-validator";

@Entity({name: "recommendations"})
export class Recommendation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    @Matches(/^(http\:\/\/)?(youtube\.com|youtu\.be)+$/, {message:"youtubeLink must be a Youtube URL."})
    youtubeLink: string;

    @Column({default:0})
    @IsInt()
    score: number;

}