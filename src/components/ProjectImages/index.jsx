import { Grid, Box, Typography } from "@mui/material";

function ProjectImages({ thumbNail, images }) {

  if (!images || images.length === 0) {
    return null;
  }

  // const [firstImg, ...remainingImgs] = images;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box
        component="img"
        sx={{
          maxHeight: 400,
          width: "100%",
          borderRadius: 1
        }}
        className="object-cover"
        alt="Main image of project"
        src={thumbNail}
      />
      <Box
        maxWidth={"100%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1
        }}
      >
        {images.slice(0, 3).map((image, index) => (
          <Box
            key={index}
            component="img"
            sx={{
              maxHeight: 80,
              width: 120,
              borderRadius: 1,
              boxShadow: 3
            }}
            className="object-cover"
            alt={`Thumbnail ${index}`}
            src={image}
          />
        ))}
        {images.length > 4 && (
          <Box
            sx={{
              position: "relative",
              borderRadius: "4px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              sx={{
                maxHeight: 80,
                width: 120,
                borderRadius: 1,
                filter: "blur(1px)",
              }}
              className="object-cover"
              alt={`Thumbnail 3`}
              src={images[3]}
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "h3.fontSize",
                opacity: .9
              }}
            >
              +{images.length - 3}
            </Box>
          </Box>
        )}
      </Box>


    </Box>
  )
}

export default ProjectImages;