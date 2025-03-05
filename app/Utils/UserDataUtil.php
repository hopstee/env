<?php

namespace App\Utils;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserDataUtil
{
    public static function generateUserData(string $name, string $email) : array
    {
        $avatarFileName = null;
        $backgroundColor = self::generatePastelColor();
        $avatarColor = self::generateContrastingColor($backgroundColor);

        $seed = urlencode("$name-$email");
        $avatarUrl = "https://api.dicebear.com/9.x/thumbs/svg?seed=$seed&backgroundColor=$backgroundColor&shapeColor=$avatarColor";

        $avatarResponse = Http::get($avatarUrl);

        if ($avatarResponse->successful()) {
            Log::info('OK');
            $avatarFileName = 'avatars/' . uniqid() . '.png';
            Storage::disk('public')->put($avatarFileName, $avatarResponse->body());
        }

        return [
            'avatar' => $avatarFileName
        ];
    }

    private static function generatePastelColor(): string
    {
        $r = mt_rand(150, 255);
        $g = mt_rand(150, 255);
        $b = mt_rand(150, 255);

        return sprintf("%02X%02X%02X", $r, $g, $b);
    }

    private static function generateContrastingColor(string $hexColor): string
    {
        list($r, $g, $b) = sscanf($hexColor, "%02x%02x%02x");

        $compR = 255 - $r;
        $compG = 255 - $g;
        $compB = 255 - $b;

        $compR = (int) (($compR + 255) / 2);
        $compG = (int) (($compG + 255) / 2);
        $compB = (int) (($compB + 255) / 2);

        return sprintf("%02X%02X%02X", $compR, $compG, $compB);
    }
}
