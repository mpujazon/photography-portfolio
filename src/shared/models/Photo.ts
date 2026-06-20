export interface PhotoDto {
    id:                 number;
    url:                string;
    title:              string;
    category:           string;
    description?:       string;
    isFeatured:         boolean;
    cameraSettings?:    CameraSettings;
}

interface CameraSettings {
    camera?:   string;
    lens?:         string;
    focalLength?:  number;
    shutterSpeed?: number;
    aperture?:     string;
    iso?:          number;
}
